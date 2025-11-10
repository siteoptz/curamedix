#!/usr/bin/env python3
"""
Convert keyword analysis JSON data to CSV format
"""

import json
import csv

def create_keywords_csv():
    # Read JSON data
    with open('keyword_analysis_data.json', 'r') as f:
        data = json.load(f)
    
    # Collect all unique keywords with their data
    keywords_dict = {}
    
    # Process each category
    categories = [
        'high_priority_keywords',
        'medium_priority_keywords', 
        'low_competition_opportunities',
        'section_179_keywords',
        'treatment_specific_keywords'
    ]
    
    for category in categories:
        if category in data:
            for keyword_data in data[category]:
                keyword = keyword_data['keyword']
                # Store keyword if not already present (avoid duplicates)
                if keyword not in keywords_dict:
                    keywords_dict[keyword] = {
                        'Keyword': keyword,
                        'Volume': keyword_data['volume'],
                        'CPC': keyword_data['cpc'],
                        'Competition': keyword_data['competition'].capitalize(),
                        'Monthly Budget Estimate': keyword_data['monthly_budget_estimate']
                    }
    
    # Sort keywords by volume (descending)
    sorted_keywords = sorted(keywords_dict.values(), key=lambda x: x['Volume'], reverse=True)
    
    # Write to CSV
    with open('curamedix_keywords.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Keyword', 'Volume', 'CPC', 'Competition', 'Monthly Budget Estimate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write header
        writer.writeheader()
        
        # Write data rows
        for row in sorted_keywords:
            writer.writerow(row)
    
    print(f"✅ CSV file created: curamedix_keywords.csv")
    print(f"📊 Total unique keywords: {len(sorted_keywords)}")
    
    # Also read from the original analyzer script to get ALL keywords
    from firecrawl_keyword_analyzer import FirecrawlKeywordAnalyzer
    
    analyzer = FirecrawlKeywordAnalyzer()
    all_keywords = []
    
    for keyword, data in analyzer.keyword_data.items():
        all_keywords.append({
            'Keyword': keyword,
            'Volume': data['volume'],
            'CPC': f"${data['cpc']:.2f}",
            'Competition': data['competition'].capitalize(),
            'Monthly Budget Estimate': f"${data['volume'] * data['cpc'] * 0.10:.2f}"
        })
    
    # Sort by volume
    all_keywords = sorted(all_keywords, key=lambda x: x['Volume'], reverse=True)
    
    # Write comprehensive CSV with ALL keywords
    with open('curamedix_all_keywords.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Keyword', 'Volume', 'CPC', 'Competition', 'Monthly Budget Estimate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for row in all_keywords:
            writer.writerow(row)
    
    print(f"✅ Comprehensive CSV created: curamedix_all_keywords.csv")
    print(f"📊 Total keywords in database: {len(all_keywords)}")

if __name__ == "__main__":
    create_keywords_csv()