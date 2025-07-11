import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import {  useNavigate } from 'react-router';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { email, password } = formData;

      // Mock credentials check
      setTimeout(() => {
        if (email === 'staff@clinic.com' && password === '123456') {
         navigate('/dashboard')
        } else {
          setLoginError('Invalid email or password');
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Medical-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 -right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green-300 rounded-full opacity-15 animate-pulse delay-3000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Hospital-themed login card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-green-100/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">HealthCare Portal</h1>
            <p className="text-green-600 font-medium">
              Staff Login Access
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{loginError}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="icon-class" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.email ? 'border-red-500' : 'border-green-200 hover:border-green-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label className="form-label">
                  Password
                </label>
                <div className="relative">
                  <Lock className="icon-class" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.password ? 'border-red-500' : 'border-green-200 hover:border-green-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

         

          
          <div className="mt-6 pt-6 border-t border-green-100">
            <p className="text-xs text-center text-green-500 font-medium">
              Secure Healthcare Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;