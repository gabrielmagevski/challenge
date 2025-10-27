import { useState } from "react"

export const useCheckedInputFilter = () => {
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean}>({});
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

      setIsChecked(old => {
        const updated = { ...old };

        if (checked) {
          updated[name] = true; 
        } else {
          delete updated[name];
        }

        return updated;
      });
  };  

  return { isChecked, handleCheckboxChange }
}
