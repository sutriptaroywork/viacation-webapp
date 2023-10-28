import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

interface FormFields {
  [key: string]: string;
}

interface FormHandlerProps<T> {
  initialData: FormFields & T;
  onSubmit: (data: FormFields & T) => void;
  onError: (errors: FormFields) => void
  children: React.ReactNode;
}

function FormHandler<T>({ initialData, onSubmit, children, onError }: FormHandlerProps<T>) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<FormFields>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      onError(validationErrors)
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors: FormFields = {};

    for (const fieldName in formData) {
      if (!formData[fieldName]) {
        validationErrors[fieldName] = `${fieldName} is required`;
      }
    }
    return validationErrors;
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 flex-col'>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const { name } = child.props;
          return React.cloneElement(child as React.ReactElement<any>, {
            value: formData[name] || '',
            onChange: handleInputChange,
          });
        }
        return child;
      })}
      <Button color='primary' type="submit">Submit</Button>
    </form>
  );
}

export default FormHandler;