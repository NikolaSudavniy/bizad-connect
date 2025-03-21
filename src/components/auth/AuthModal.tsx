import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AtSign, EyeOff, Eye, UserPlus, LogIn, Check, Briefcase, Megaphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { AccountType } from '@/components/layout/Navbar';

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z.object({
  name: z.string()
    .min(1, { message: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' })
    .refine(name => /^[a-zA-Z\s]*$/.test(name), {
      message: "Name can only contain letters and spaces"
    }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password must be less than 50 characters' })
    .refine(password => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter"
    })
    .refine(password => /[0-9]/.test(password), {
      message: "Password must contain at least one number"
    }),
  confirmPassword: z.string()
    .min(1, { message: 'Please confirm your password' }),
  accountType: z.enum(['business', 'advertiser'], {
    required_error: "Please select an account type",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
  onAuthSuccess?: (accountType?: AccountType) => void;
}

const AuthModal = ({ open, onOpenChange, defaultTab = 'login', onAuthSuccess }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: undefined,
    },
    mode: 'onChange',
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    console.log('Login data:', data);
    toast({
      title: "Success!",
      description: "You have been logged in.",
      duration: 3000,
    });
    
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    
    onOpenChange(false);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log('Register data:', data);
    toast({
      title: "Account created!",
      description: "Your account has been created successfully.",
      duration: 3000,
    });
    
    if (onAuthSuccess) {
      onAuthSuccess(data.accountType);
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('accountType', data.accountType);
    
    onOpenChange(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'register');
    if (value === 'login') {
      registerForm.reset();
    } else {
      loginForm.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Enter your credentials to sign in to your account' 
              : 'Fill in your details to create a new account'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="email@example.com" 
                            {...field} 
                            className="pl-9"
                            autoComplete="email"
                          />
                          <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="pr-9"
                            autoComplete="current-password"
                          />
                          <button 
                            type="button" 
                            className="absolute right-3 top-3" 
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={!loginForm.formState.isValid || loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In
                    </span>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button 
                className="text-primary hover:underline font-medium" 
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-3">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-3">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          autoComplete="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="email@example.com" 
                            {...field} 
                            className="pl-9"
                            autoComplete="email"
                          />
                          <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="pr-9"
                            autoComplete="new-password"
                          />
                          <button 
                            type="button" 
                            className="absolute right-3 top-3" 
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {registerForm.formState.errors.password ? null : (
                        <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                          <li className="flex items-center gap-1">
                            <Check className={`h-3 w-3 ${field.value.length >= 6 ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>At least 6 characters</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className={`h-3 w-3 ${/[A-Z]/.test(field.value) ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>At least one uppercase letter</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className={`h-3 w-3 ${/[0-9]/.test(field.value) ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>At least one number</span>
                          </li>
                        </ul>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="pr-9"
                            autoComplete="new-password"
                          />
                          <button 
                            type="button" 
                            className="absolute right-3 top-3" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          <Card 
                            className={`cursor-pointer border-2 transition-all ${field.value === 'business' ? 'border-primary' : 'border-border'}`}
                            onClick={() => field.onChange('business')}
                          >
                            <CardContent className="flex flex-col items-center justify-center p-2">
                              <Briefcase className="h-5 w-5 text-blue-500 mb-1" />
                              <h3 className="text-sm font-medium">Business</h3>
                              <p className="text-xs text-muted-foreground text-center mt-0.5">Looking for advertising services</p>
                            </CardContent>
                          </Card>
                          <Card 
                            className={`cursor-pointer border-2 transition-all ${field.value === 'advertiser' ? 'border-primary' : 'border-border'}`}
                            onClick={() => field.onChange('advertiser')}
                          >
                            <CardContent className="flex flex-col items-center justify-center p-2">
                              <Megaphone className="h-5 w-5 text-primary mb-1" />
                              <h3 className="text-sm font-medium">Advertiser</h3>
                              <p className="text-xs text-muted-foreground text-center mt-0.5">Providing advertising services</p>
                            </CardContent>
                          </Card>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  size="lg"
                  disabled={!registerForm.formState.isValid || registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account
                    </span>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <button 
                className="text-primary hover:underline font-medium" 
                onClick={() => handleTabChange('login')}
              >
                Sign In
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
