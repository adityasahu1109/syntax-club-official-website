import os

pages_dir = 'src/pages'
files = [f for f in os.listdir(pages_dir) if f.endswith('.jsx') and f != 'Home.jsx']

for file in files:
    filepath = os.path.join(pages_dir, file)
    with open(filepath, 'r') as f:
        content = f.read()

    # Clean duplicates
    content = content.replace('bg-black/20 bg-background-dark/50', 'bg-white/5 backdrop-blur-md')
    content = content.replace('bg-black/20/50 bg-background-dark/50', 'bg-white/5 backdrop-blur-md')
    content = content.replace('border border-slate-200 border-white/10', 'border border-white/10')
    content = content.replace('border border-slate-200 dark:border-primary/5', 'border border-primary/10')
    content = content.replace('border border-slate-200 dark:border-primary/10', 'border border-primary/10')
    content = content.replace('border border-slate-200 dark:border-white/10', 'border border-white/10')
    content = content.replace('font-black font-black leading-tight tracking-tighter', 'font-black leading-tight tracking-tighter')
    content = content.replace('border-slate-200 border-white/10', 'border-white/10')
    content = content.replace('bg-slate-50 dark:bg-primary/5', 'bg-white/5 backdrop-blur-md')
    content = content.replace('bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10', 'bg-white/5 backdrop-blur-md border border-white/10')

    with open(filepath, 'w') as f:
        f.write(content)

