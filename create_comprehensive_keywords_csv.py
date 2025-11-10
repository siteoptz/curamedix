#!/usr/bin/env python3
"""
Create comprehensive CSV with ALL keywords from all sources
"""

import csv

def create_comprehensive_csv():
    # Complete keyword database with all variations and data
    all_keywords = [
        # Primary Keywords
        {"Keyword": "shockwave therapy equipment", "Volume": 1900, "CPC": "$8.50", "Competition": "High", "Monthly Budget Estimate": "$1615.00"},
        {"Keyword": "extracorporeal shockwave therapy", "Volume": 2400, "CPC": "$7.25", "Competition": "Medium", "Monthly Budget Estimate": "$1740.00"},
        {"Keyword": "ESWT equipment", "Volume": 880, "CPC": "$9.75", "Competition": "Medium", "Monthly Budget Estimate": "$858.00"},
        {"Keyword": "shockwave therapy machine", "Volume": 1600, "CPC": "$8.25", "Competition": "High", "Monthly Budget Estimate": "$1320.00"},
        {"Keyword": "medical shockwave device", "Volume": 720, "CPC": "$10.50", "Competition": "Medium", "Monthly Budget Estimate": "$756.00"},
        
        # Section 179 Tax Keywords
        {"Keyword": "section 179 medical equipment", "Volume": 3100, "CPC": "$4.50", "Competition": "Low", "Monthly Budget Estimate": "$1395.00"},
        {"Keyword": "medical equipment tax deduction", "Volume": 2900, "CPC": "$3.75", "Competition": "Low", "Monthly Budget Estimate": "$1087.50"},
        {"Keyword": "section 179 deduction 2025", "Volume": 8400, "CPC": "$2.25", "Competition": "Low", "Monthly Budget Estimate": "$1890.00"},
        {"Keyword": "medical device tax write off", "Volume": 1200, "CPC": "$3.50", "Competition": "Low", "Monthly Budget Estimate": "$420.00"},
        
        # Treatment Specific Keywords
        {"Keyword": "plantar fasciitis shockwave therapy", "Volume": 3300, "CPC": "$5.75", "Competition": "Medium", "Monthly Budget Estimate": "$1897.50"},
        {"Keyword": "tendonitis shockwave treatment", "Volume": 1800, "CPC": "$6.25", "Competition": "Medium", "Monthly Budget Estimate": "$1125.00"},
        {"Keyword": "chronic pain shockwave therapy", "Volume": 2100, "CPC": "$5.50", "Competition": "Medium", "Monthly Budget Estimate": "$1155.00"},
        {"Keyword": "sports injury shockwave", "Volume": 1400, "CPC": "$6.75", "Competition": "Medium", "Monthly Budget Estimate": "$945.00"},
        {"Keyword": "calcific tendinitis treatment", "Volume": 990, "CPC": "$7.25", "Competition": "Low", "Monthly Budget Estimate": "$717.75"},
        
        # Brand and Competitor Keywords
        {"Keyword": "curamedix shockwave", "Volume": 210, "CPC": "$2.50", "Competition": "Low", "Monthly Budget Estimate": "$52.50"},
        {"Keyword": "FDA approved shockwave therapy", "Volume": 1100, "CPC": "$8.75", "Competition": "High", "Monthly Budget Estimate": "$962.50"},
        {"Keyword": "best shockwave therapy machine", "Volume": 880, "CPC": "$9.25", "Competition": "High", "Monthly Budget Estimate": "$814.00"},
        {"Keyword": "shockwave therapy device cost", "Volume": 1300, "CPC": "$7.50", "Competition": "High", "Monthly Budget Estimate": "$975.00"},
        
        # Location-Based Keywords
        {"Keyword": "shockwave therapy equipment USA", "Volume": 590, "CPC": "$8.90", "Competition": "Medium", "Monthly Budget Estimate": "$525.10"},
        {"Keyword": "buy shockwave therapy machine", "Volume": 1200, "CPC": "$10.25", "Competition": "High", "Monthly Budget Estimate": "$1230.00"},
        {"Keyword": "shockwave therapy equipment lease", "Volume": 480, "CPC": "$6.75", "Competition": "Medium", "Monthly Budget Estimate": "$324.00"},
        {"Keyword": "shockwave therapy equipment financing", "Volume": 390, "CPC": "$5.50", "Competition": "Low", "Monthly Budget Estimate": "$214.50"},
        
        # ROI and Business Keywords
        {"Keyword": "shockwave therapy ROI", "Volume": 320, "CPC": "$4.25", "Competition": "Low", "Monthly Budget Estimate": "$136.00"},
        {"Keyword": "shockwave therapy practice revenue", "Volume": 180, "CPC": "$3.75", "Competition": "Low", "Monthly Budget Estimate": "$67.50"},
        {"Keyword": "shockwave therapy billing codes", "Volume": 670, "CPC": "$2.50", "Competition": "Low", "Monthly Budget Estimate": "$167.50"},
        {"Keyword": "shockwave therapy CPT codes", "Volume": 890, "CPC": "$2.25", "Competition": "Low", "Monthly Budget Estimate": "$200.25"},
        
        # Clinical and Professional Keywords
        {"Keyword": "orthopedic shockwave therapy", "Volume": 1500, "CPC": "$7.50", "Competition": "Medium", "Monthly Budget Estimate": "$1125.00"},
        {"Keyword": "sports medicine shockwave", "Volume": 980, "CPC": "$8.25", "Competition": "Medium", "Monthly Budget Estimate": "$808.50"},
        {"Keyword": "pain management equipment", "Volume": 2200, "CPC": "$6.50", "Competition": "High", "Monthly Budget Estimate": "$1430.00"},
        {"Keyword": "non invasive pain treatment", "Volume": 1700, "CPC": "$5.25", "Competition": "Medium", "Monthly Budget Estimate": "$892.50"},
        {"Keyword": "regenerative medicine equipment", "Volume": 1100, "CPC": "$7.75", "Competition": "Medium", "Monthly Budget Estimate": "$852.50"},
        
        # Additional Long-tail Keywords
        {"Keyword": "focused shockwave therapy equipment", "Volume": 420, "CPC": "$9.50", "Competition": "Medium", "Monthly Budget Estimate": "$399.00"},
        {"Keyword": "radial shockwave therapy device", "Volume": 380, "CPC": "$8.75", "Competition": "Medium", "Monthly Budget Estimate": "$332.50"},
        {"Keyword": "acoustic wave therapy equipment", "Volume": 560, "CPC": "$7.25", "Competition": "Medium", "Monthly Budget Estimate": "$406.00"},
        {"Keyword": "shockwave therapy for heel spurs", "Volume": 890, "CPC": "$5.50", "Competition": "Medium", "Monthly Budget Estimate": "$489.50"},
        {"Keyword": "shockwave therapy for tennis elbow", "Volume": 1100, "CPC": "$6.25", "Competition": "Medium", "Monthly Budget Estimate": "$687.50"},
        {"Keyword": "shockwave therapy for achilles tendonitis", "Volume": 780, "CPC": "$6.75", "Competition": "Medium", "Monthly Budget Estimate": "$526.50"},
        {"Keyword": "ED shockwave therapy equipment", "Volume": 1400, "CPC": "$12.50", "Competition": "High", "Monthly Budget Estimate": "$1750.00"},
        {"Keyword": "veterinary shockwave therapy equipment", "Volume": 340, "CPC": "$7.50", "Competition": "Low", "Monthly Budget Estimate": "$255.00"},
        {"Keyword": "portable shockwave therapy device", "Volume": 480, "CPC": "$9.25", "Competition": "Medium", "Monthly Budget Estimate": "$444.00"},
        {"Keyword": "shockwave therapy equipment rental", "Volume": 290, "CPC": "$5.75", "Competition": "Low", "Monthly Budget Estimate": "$166.75"},
        
        # Comparison and Research Keywords
        {"Keyword": "shockwave therapy vs ultrasound", "Volume": 390, "CPC": "$3.50", "Competition": "Low", "Monthly Budget Estimate": "$136.50"},
        {"Keyword": "shockwave therapy effectiveness", "Volume": 720, "CPC": "$4.25", "Competition": "Low", "Monthly Budget Estimate": "$306.00"},
        {"Keyword": "shockwave therapy clinical studies", "Volume": 480, "CPC": "$3.75", "Competition": "Low", "Monthly Budget Estimate": "$180.00"},
        {"Keyword": "shockwave therapy success rate", "Volume": 590, "CPC": "$4.50", "Competition": "Low", "Monthly Budget Estimate": "$265.50"},
        
        # Purchase Intent Keywords
        {"Keyword": "shockwave therapy equipment price", "Volume": 890, "CPC": "$8.50", "Competition": "High", "Monthly Budget Estimate": "$756.50"},
        {"Keyword": "shockwave therapy machine for sale", "Volume": 670, "CPC": "$9.75", "Competition": "High", "Monthly Budget Estimate": "$653.25"},
        {"Keyword": "used shockwave therapy equipment", "Volume": 340, "CPC": "$6.50", "Competition": "Medium", "Monthly Budget Estimate": "$221.00"},
        {"Keyword": "shockwave therapy equipment suppliers", "Volume": 280, "CPC": "$7.25", "Competition": "Medium", "Monthly Budget Estimate": "$203.00"},
        
        # Insurance and Reimbursement Keywords
        {"Keyword": "shockwave therapy insurance coverage", "Volume": 890, "CPC": "$3.25", "Competition": "Low", "Monthly Budget Estimate": "$289.25"},
        {"Keyword": "shockwave therapy medicare reimbursement", "Volume": 560, "CPC": "$3.50", "Competition": "Low", "Monthly Budget Estimate": "$196.00"},
        {"Keyword": "shockwave therapy reimbursement codes", "Volume": 340, "CPC": "$2.75", "Competition": "Low", "Monthly Budget Estimate": "$93.50"},
        
        # Training and Education Keywords
        {"Keyword": "shockwave therapy training", "Volume": 780, "CPC": "$5.50", "Competition": "Medium", "Monthly Budget Estimate": "$429.00"},
        {"Keyword": "shockwave therapy certification", "Volume": 560, "CPC": "$4.75", "Competition": "Low", "Monthly Budget Estimate": "$266.00"},
        {"Keyword": "shockwave therapy protocols", "Volume": 420, "CPC": "$3.50", "Competition": "Low", "Monthly Budget Estimate": "$147.00"}
    ]
    
    # Sort by volume (highest first)
    all_keywords = sorted(all_keywords, key=lambda x: x['Volume'], reverse=True)
    
    # Write to CSV
    with open('curamedix_all_keywords_comprehensive.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Keyword', 'Volume', 'CPC', 'Competition', 'Monthly Budget Estimate']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write header
        writer.writeheader()
        
        # Write all keywords
        for keyword in all_keywords:
            writer.writerow(keyword)
    
    print(f"✅ Comprehensive CSV created: curamedix_all_keywords_comprehensive.csv")
    print(f"📊 Total keywords: {len(all_keywords)}")
    
    # Calculate summary statistics
    total_volume = sum(kw['Volume'] for kw in all_keywords)
    avg_cpc = sum(float(kw['CPC'].replace('$', '')) for kw in all_keywords) / len(all_keywords)
    
    print(f"📈 Total monthly search volume: {total_volume:,}")
    print(f"💰 Average CPC: ${avg_cpc:.2f}")
    
    # Count by competition level
    low_comp = sum(1 for kw in all_keywords if kw['Competition'] == 'Low')
    med_comp = sum(1 for kw in all_keywords if kw['Competition'] == 'Medium')
    high_comp = sum(1 for kw in all_keywords if kw['Competition'] == 'High')
    
    print(f"\n🎯 Competition breakdown:")
    print(f"  - Low competition: {low_comp} keywords")
    print(f"  - Medium competition: {med_comp} keywords")
    print(f"  - High competition: {high_comp} keywords")

if __name__ == "__main__":
    create_comprehensive_csv()