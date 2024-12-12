import { execSync } from 'child_process';

try {
  console.log('Installing dependencies...');
  execSync('yarn add @radix-ui/react-slot lucide-react', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
}