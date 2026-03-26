import os

pages_dir = 'src/pages'
files = [f for f in os.listdir(pages_dir) if f.endswith('.jsx') and f != 'Home.jsx']

for file in files:
    filepath = os.path.join(pages_dir, file)
    with open(filepath, 'r') as f:
        content = f.read()

    # Normalize Card Styles
    content = content.replace('bg-white dark:bg-slate-900/40', 'bg-white/5 backdrop-blur-md')
    content = content.replace('bg-slate-900/80 backdrop-blur-sm', 'bg-black/50 backdrop-blur-md')
    content = content.replace('bg-[rgba(3,7,18,0.4)] backdrop-blur-xl', 'bg-background-dark/40 backdrop-blur-xl')
    
    # Fix Double font-black and leading-tight
    content = content.replace('font-black leading-tight font-black leading-tight', 'leading-tight font-black')
    content = content.replace('leading-tight font-black leading-tight', 'leading-tight font-black')
    content = content.replace('font-black font-black', 'font-black')

    # Fix unhandled borders and backgrounds
    content = content.replace('bg-slate-200 dark:bg-slate-900', 'bg-black/40 border-white/5 border')
    content = content.replace('bg-slate-200 dark:bg-slate-800', 'bg-white/5 border-white/10 border text-white')
    content = content.replace('text-slate-700 dark:text-slate-300', 'text-slate-300')
    
    with open(filepath, 'w') as f:
        f.write(content)
