import Image from "next/image"; // Importing the Image component from Next.js
import React from "react"; // Importing React to define a functional component
import { Button } from "./ui/button"; // Importing the Button component from a custom UI library

interface ButtonProps {
  isLoading: boolean; // Indicates whether the button is in a loading state
  className?: string; // Optional class name for additional styling
  children: React.ReactNode; // Content inside the button, expected to be React nodes
}

// Define a functional component named SubmitButton, which takes ButtonProps as its props
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {/* If isLoading is true, display a loading indicator */}
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            height={24}
            width={24}
            alt="loader"
            className="animate-spin"
          />{" "}
          {/* Display a spinning loader icon */}
          <span>Loading...</span> {/* Display loading text */}
        </div>
      ) : (
        children // Otherwise, display the children (content inside the button)
      )}
    </Button> // Render the Button component
  );
};

export default SubmitButton; // Export the SubmitButton component as default
