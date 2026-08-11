import { cva } from 'class-variance-authority';
import React from 'react';
import { buttonVariants } from '../Button';

// Error page variants configuration
const errorPageVariants = cva(
  'min-h-screen flex flex-col items-center justify-center px-4 text-center',
  {
    variants: {
      variant: {
        '401': 'bg-slate-900 text-white',
        '403': 'bg-red-950 text-red-100',
        '404': 'bg-indigo-950 text-indigo-100',
        '500': 'bg-orange-950 text-orange-100',
        '503': 'bg-purple-950 text-purple-100',
      },
    },
    defaultVariants: {
      variant: '404',
    },
  }
);

const errorCodeVariants = cva(
  'text-[6.95rem] md:text-9xl font-bold mb-4 opacity-90',
  {
    variants: {
      variant: {
        '401': 'text-white',
        '403': 'text-red-400',
        '404': 'text-indigo-400',
        '500': 'text-orange-400',
        '503': 'text-purple-400',
      },
    },
    defaultVariants: {
      variant: '404',
    },
  }
);

// Error content configuration
const errorContent = {
  '401': {
    title: 'Unauthorized Access',
    description:
      'Please log in with the appropriate credentials to access this resource.',
    buttons: [
      { text: 'Go Back', variant: 'secondary' as const },
      { text: 'Back to Home', variant: 'primary' as const },
    ],
  },
  '403': {
    title: 'Access Forbidden',
    description: "You don't have necessary permission to view this resource.",
    buttons: [
      { text: 'Go Back', variant: 'secondary' as const },
      { text: 'Back to Home', variant: 'primary' as const },
    ],
  },
  '404': {
    title: 'Oops! Page Not Found!',
    description:
      "It seems like the page you're looking for does not exist or might have been removed.",
    buttons: [
      { text: 'Go Back', variant: 'secondary' as const },
      { text: 'Back to Home', variant: 'primary' as const },
    ],
  },
  '500': {
    title: 'Oops! Something went wrong :)',
    description: 'We apologize for the inconvenience. Please try again later.',
    buttons: [
      { text: 'Go Back', variant: 'secondary' as const },
      { text: 'Back to Home', variant: 'primary' as const },
    ],
  },
  '503': {
    title: 'Website is under maintenance!',
    description:
      "The site is not available at the moment. We'll be back online shortly.",
    buttons: [
      { text: 'Learn more', variant: 'secondary' as const },
      { text: 'Back to Home', variant: 'primary' as const },
    ],
  },
};

export interface ErrorPageProps {
  variant?: '401' | '403' | '404' | '500' | '503';
  onGoBack?: () => void;
  onBackToHome?: () => void;
  onLearnMore?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  variant = '404',
  onGoBack = () => window.history.back(),
  onBackToHome = () => {
    window.location.href = '/';
  },
  onLearnMore,
}) => {
  const content = errorContent[variant];

  const handleButtonClick = (buttonText: string) => {
    switch (buttonText) {
      case 'Go Back':
        onGoBack();
        break;
      case 'Back to Home':
        onBackToHome();
        break;
      case 'Learn more':
        onLearnMore?.();
        break;
      default:
        break;
    }
  };

  return (
    <div className={errorPageVariants({ variant })}>
      <div className="max-w-md mx-auto">
        <h1 className={errorCodeVariants({ variant })}>{variant}</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.title}</h2>
        <p className="text-lg opacity-80 mb-8 leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {content.buttons.map((button) => (
            <button
              key={button.text}
              type="button"
              onClick={() => handleButtonClick(button.text)}
              className={buttonVariants({ variant: button.variant })}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
