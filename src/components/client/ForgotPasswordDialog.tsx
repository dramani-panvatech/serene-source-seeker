
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
    
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions.",
    });
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setEmail('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline">
          Forgot Password?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Reset Password
          </DialogTitle>
        </DialogHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <p className="text-sm text-gray-600">
              We'll send you a link to reset your password.
            </p>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Send Reset Link
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto animate-scale-in" />
            <div>
              <h3 className="font-semibold text-green-800">Email Sent!</h3>
              <p className="text-sm text-gray-600 mt-2">
                Check your inbox for reset instructions.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
