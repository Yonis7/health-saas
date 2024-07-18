import Image from "next/image"; // Importing the Image component from Next.js
import React from "react"; // Importing React to define a functional component
import { Button } from "./ui/button"; // Importing the Button component from a custom UI library

// Define props interface for SubmitButton component
interface ButtonProps {
  isLoading: boolean; // Indicates whether the button is in a loading state
  className?: string; // Optional class name for additional styling
  children: React.ReactNode; // Content inside the button, expected to be React nodes
}

// Define SubmitButton functional component
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"} // Default class name for styling
    >
      {isLoading ? ( // Display loading indicator if isLoading is true
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            height={24}
            width={24}
            alt="loader"
            className="animate-spin" // Apply spinning animation to loader icon
          />
          <span>Loading...</span> {/* Display loading text */}
        </div>
      ) : (
        children // Render children (button content) when not loading
      )}
    </Button>
  );
};

export default SubmitButton; // Export SubmitButton as default
