import { execSync } from 'child_process';

try {
  console.log('Installing shadcn components...');
  execSync('npx shadcn@latest add button card', { stdio: 'inherit' });
  console.log('shadcn components installed successfully.');
} catch (error) {
  console.error('Error installing shadcn components:', error.message);
}