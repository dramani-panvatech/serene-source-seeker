
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordDialog from '@/components/client/ForgotPasswordDialog';
import ContactSupportDialog from '@/components/client/ContactSupportDialog';
import { authClientLogin } from '@/lib/authClientLogin';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };


  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();
    setApiError('');

    if (validateForm()) {
      setIsLoading(true);
      console.log(formData);
      try {
        await authClientLogin({
          email: formData.email,
          password: formData.password
        });

        setIsLoading(false);
        navigate('/client-dashboard');
      } catch (error: any) {
        setApiError(error.message || 'Login failed. Please try again.');
        setIsLoading(false);
      }
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Branding with Enhanced Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl animate-scale-in hover-scale transition-all duration-500">
            <div className="relative">
              <Clock className="h-10 w-10 text-white" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
            Client Portal
          </h1>
          <p className="text-gray-600 mt-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Welcome back! Ready to book your next appointment?
          </p>
        </div>

        {/* Login Card with Enhanced Animation */}
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 animate-fade-in hover-scale transition-all duration-500" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} // correct
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // correct
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
              </div>

              {apiError && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">{apiError}</p>
              )}

              <div className="flex items-center justify-between text-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <ForgotPasswordDialog />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: '0.7s' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Need help? <ContactSupportDialog />
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
