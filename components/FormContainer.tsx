// components/FormContainer.tsx

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
  }
  
  const FormContainer = ({ title, children }: FormContainerProps) => {
    return (
      <div className="card">
        <h1>{title}</h1>
        {children}
      </div>
    );
  };
  
  export default FormContainer;
  