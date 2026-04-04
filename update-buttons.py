import os
import glob
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return

    original_content = content

    replacements = [
        # 1. Services.tsx
        (r'className="inline-block px-10 py-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-black transition duration-300 font-semibold"',
         r'className="inline-block px-10 py-4 border border-primary text-white rounded-full bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,148,0.2)] hover:shadow-[0_0_30px_rgba(0,255,148,0.6)] hover:bg-primary/20 transition duration-300 font-semibold"'),
        
        # 2. AdvancedContact.tsx
        (r'className="mt-10 px-10 py-4 bg-primary text-black font-semibold rounded-full shadow-\[0_0_40px_rgba\(0,255,148,0.8\)\]"',
         r'className="mt-10 px-10 py-4 bg-black/80 border border-primary text-white font-semibold rounded-full shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:bg-primary/20 transition duration-300"'),
        
        # 3. PortfolioGrid.tsx
        (r'"bg-primary text-black font-semibold shadow-\[0_0_20px_rgba\(0,255,148,0.8\)\] border-primary"',
         r'"bg-primary/20 text-white font-semibold shadow-[0_0_20px_rgba(0,255,148,0.4)] border-primary border"'),
        
        # 4. Navbar.tsx Desktop
        (r'className="px-5 py-2 text-sm bg-primary text-black font-semibold rounded-full\s*shadow-\[0_0_20px_rgba\(0,255,148,0.6\)\] hover:shadow-\[0_0_35px_rgba\(0,255,148,0.9\)\] transition duration-300"',
         r'className="px-5 py-2 text-sm bg-black/80 border border-primary text-white font-semibold rounded-full shadow-[0_0_15px_rgba(0,255,148,0.4)] hover:shadow-[0_0_30px_rgba(0,255,148,0.8)] hover:bg-primary/20 transition duration-300"'),
        
        # 5. Navbar.tsx Mobile
        (r'className="block text-center px-5 py-4 bg-primary text-black font-semibold rounded-2xl shadow-\[0_0_30px_rgba\(0,255,148,0.6\)\] hover:scale-\[1.02\] transition"',
         r'className="block text-center px-5 py-4 bg-black/80 border border-primary text-white font-semibold rounded-2xl shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:bg-primary/20 hover:scale-[1.02] transition"'),

        # 6. Footer.tsx
        (r'className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-black transition"',
         r'className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:border-primary hover:text-white hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,255,148,0.5)] transition"'),
        
        # 7. services/page.tsx
        (r'className="px-8 py-4 bg-primary text-black font-semibold rounded-full shadow-\[0_0_40px_rgba\(0,255,148,0.8\)\] hover:scale-105 transition duration-300"',
         r'className="px-8 py-4 bg-black/80 border border-primary text-white font-semibold rounded-full shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:bg-primary/20 hover:scale-105 transition duration-300"'),
         
        # 8. services/page.tsx
        (r'className="inline-block px-12 py-5 bg-primary text-black font-semibold rounded-full shadow-\[0_0_50px_rgba\(0,255,148,0.8\)\] hover:scale-105 transition duration-300 text-lg"',
         r'className="inline-block px-12 py-5 bg-black/80 border border-primary text-white font-semibold rounded-full shadow-[0_0_30px_rgba(0,255,148,0.4)] hover:shadow-[0_0_60px_rgba(0,255,148,0.8)] hover:bg-primary/20 hover:scale-105 transition duration-300 text-lg"'),
         
        # 9. services/page.tsx
        (r'className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black rounded-full font-semibold shadow-\[0_0_30px_rgba\(0,255,148,0.6\)\] hover:scale-105 hover:shadow-\[0_0_50px_rgba\(0,255,148,0.9\)\] transition duration-300"',
         r'className="inline-flex items-center gap-2 px-8 py-3 bg-black/80 border border-primary text-white rounded-full font-semibold shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:bg-primary/20 transition duration-300"'),
         
        # 10. portfolio/page.tsx
        (r'className="px-10 py-4 bg-primary text-black\n\s*rounded-full font-semibold hover:bg-primary hover:text-black transition duration-300 cursor-pointer"',
         r'className="px-10 py-4 bg-black/80 border border-primary text-white rounded-full font-semibold shadow-[0_0_20px_rgba(0,255,148,0.4)] hover:shadow-[0_0_40px_rgba(0,255,148,0.8)] hover:bg-primary/20 transition duration-300 cursor-pointer"')
    ]

    for search, replace in replacements:
        content = re.sub(search, replace, content, flags=re.MULTILINE)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))

process_directory('src')

# Fix any stray bg-primary text-black just in case
def catch_all():
    for root, _, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content = re.sub(r'bg-primary text-black', r'bg-black/80 border border-primary text-white', content)
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Catch-all updated: {filepath}")

catch_all()
