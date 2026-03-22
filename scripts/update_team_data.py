import csv
import json
import sys
import os
import re

def clean_google_drive_url(url):
    """
    Extracts the file ID from a Google Drive link and returns a direct image link format.
    Google Forms often provides links like: https://drive.google.com/open?id=FILE_ID
    or https://drive.google.com/file/d/FILE_ID/view?usp=drive_web
    We convert it to a format useable in src attributes: https://drive.google.com/uc?export=view&id=FILE_ID
    """
    if not url:
        return ""
    
    # Check for /file/d/ID/ format
    match_d = re.search(r'/file/d/([^/]+)/?', url)
    if match_d:
        file_id = match_d.group(1)
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    
    # Check for ?id=ID format
    match_id = re.search(r'id=([^&]+)', url)
    if match_id and 'drive.google.com' in url:
        file_id = match_id.group(1)
        return f"https://drive.google.com/uc?export=view&id={file_id}"
    
    return url

import glob

def main():
    # The script is in `scripts/`, so the base_dir is its parent directory (syntaxclub root)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(script_dir)
    json_path = os.path.join(base_dir, 'src', 'data', 'team.json')
    
    if len(sys.argv) >= 2:
        csv_path = sys.argv[1]
    else:
        # Auto-detect a CSV in the root directory
        csv_files = glob.glob(os.path.join(base_dir, '*.csv'))
        if not csv_files:
            print("Error: No CSV file found in the project root.")
            print("Usage: python scripts/update_team_data.py [path_to_csv_file]")
            sys.exit(1)
        csv_path = csv_files[0]
        print(f"Auto-detected CSV file: {os.path.basename(csv_path)}")
    
    team_data = []
    
    try:
        with open(csv_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for index, row in enumerate(reader, start=1):
                # Helper to find values across slightly variable column names
                def get_val(keyword):
                    for k, v in row.items():
                        if k and keyword.lower() in k.lower():
                            return v.strip()
                    return ""
                
                name = get_val("Full Name")
                role = get_val("Current Position")
                
                image_url_raw = get_val("Upload your Profile Photo")
                image_url = clean_google_drive_url(image_url_raw)
                
                email = get_val("Email Address")
                mail_url = f"mailto:{email}" if email else ""
                
                linkedin_url = get_val("LinkedIn")
                
                member = {
                    "id": index,
                    "name": name,
                    "role": role,
                    "imageUrl": image_url,
                    "mailUrl": mail_url,
                    "linkedinUrl": linkedin_url,
                    "githubUrl": "#"  # Hardcoded since it doesn't exist in the form
                }
                
                # We skip empty rows just in case
                if name:
                    team_data.append(member)
                    
        # Ensure the destination directory exists
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
            
        with open(json_path, mode='w', encoding='utf-8') as f:
            json.dump(team_data, f, indent=2)
            
        print(f"Successfully processed {len(team_data)} members and saved to {os.path.relpath(json_path, base_dir)}")
        
    except Exception as e:
        print(f"Error processing CSV: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
