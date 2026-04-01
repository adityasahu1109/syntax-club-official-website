import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/save' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { type, data } = JSON.parse(body);
                const targetFile = type === 'projects' ? 'projects.json' : 'blogs.json';
                const targetPath = path.resolve(process.cwd(), 'src/data', targetFile);
                
                fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
