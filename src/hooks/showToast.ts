import toast from 'react-hot-toast';

export type ToastProps = {
    text: string;
    icon?: string;
    type?: 'success' | 'error';
  };
  
  export const showToast = ({ text, icon, type = 'success' }: ToastProps) => {
    toast[type](text, {
      duration: 4000,
      icon: icon,
      style: {
        background: type === 'error' ? '#FF4E43' : '#5D51E3', 
        color: '#fff',
        fontWeight: 'medium',
        padding: '16px',
        borderRadius: '8px',
        height: '50px',
      },
    });
  };