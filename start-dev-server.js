import { execSync } from 'child_process';

try {
  console.log('Starting development server...');
  execSync('yarn dev', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting development server:', error.message);
}