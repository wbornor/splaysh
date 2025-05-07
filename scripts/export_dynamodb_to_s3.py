import boto3
import json
import os
from datetime import datetime

class DynamoDBToStaticJSON:
    def __init__(self, table_name, s3_bucket, export_base_path='data/posts'):
        self.dynamodb = boto3.resource('dynamodb')
        self.s3 = boto3.client('s3')
        self.table = self.dynamodb.Table(table_name)
        self.s3_bucket = s3_bucket
        self.export_base_path = export_base_path
        self.nut_types = [
            'TALKNUT', 'FAVNUT', 'PHOTONUT', 'WISHNUT', 'MEDIANUT', 
            'PROJECTNUT', 'ANALNUT', 'AUDINUT', 'BUDNUT', 'MAPNUT'
        ]

    def fetch_all_items(self, nut_type):
        """Fetch all items for a specific nut type"""
        response = self.table.scan(
            FilterExpression='nut_type = :nut_type AND is_public = :is_public',
            ExpressionAttributeValues={
                ':nut_type': nut_type,
                ':is_public': 1
            }
        )
        return response['Items']

    def paginate_items(self, items, page_size=20):
        """Paginate items into chunks"""
        return [items[i:i+page_size] for i in range(0, len(items), page_size)]

    def generate_index_metadata(self, nut_type, total_items, total_pages):
        """Generate index metadata for a nut type"""
        return {
            'nut_type': nut_type,
            'total_items': total_items,
            'total_pages': total_pages,
            'last_updated': datetime.now().isoformat()
        }

    def upload_to_s3(self, key, data):
        """Upload JSON data to S3"""
        self.s3.put_object(
            Bucket=self.s3_bucket,
            Key=key,
            Body=json.dumps(data, indent=2),
            ContentType='application/json'
        )

    def export_nut_type(self, nut_type):
        """Export all items for a specific nut type"""
        items = self.fetch_all_items(nut_type)
        # Sort items by create_date for consistent pagination
        items.sort(key=lambda x: x.get('create_date', ''), reverse=True)
        
        paginated_items = self.paginate_items(items)
        
        # Upload individual page files
        for page_num, page_items in enumerate(paginated_items, 1):
            page_key = f'{self.export_base_path}/{nut_type.lower()[:-3]}/page_{page_num}.json'
            self.upload_to_s3(page_key, page_items)
        
        # Upload index file with metadata
        index_metadata = self.generate_index_metadata(
            nut_type, 
            len(items), 
            len(paginated_items)
        )
        index_key = f'{self.export_base_path}/{nut_type.lower()[:-3]}/index.json'
        self.upload_to_s3(index_key, index_metadata)

        # Upload individual item files
        for item in items:
            item_id = item['id']
            id_range = f'{(item_id // 1000) * 1000}-{((item_id // 1000) + 1) * 1000 - 1}'
            item_key = f'{self.export_base_path}/by_id/{id_range}/{item_id}.json'
            self.upload_to_s3(item_key, item)

    def export_all(self):
        """Export all nut types"""
        for nut_type in self.nut_types:
            self.export_nut_type(nut_type)

        # Create global index
        global_index = {
            'nut_types': self.nut_types,
            'last_full_export': datetime.now().isoformat()
        }
        self.upload_to_s3(f'{self.export_base_path}/index.json', global_index)

def main():
    # Replace with your actual DynamoDB table and S3 bucket names
    exporter = DynamoDBToStaticJSON(
        table_name='splaysh-items', 
        s3_bucket='splaysh-static-data'
    )
    exporter.export_all()

if __name__ == '__main__':
    main()
