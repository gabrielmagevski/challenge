import { useState } from "react"

export const useCheckedInputFilter = () => {
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({});
  const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: boolean }>({});

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

  const applyFilters = () => {
    setAppliedFilters(isChecked);
  };

  const clearFilters = () => {
    setIsChecked({});
    setAppliedFilters({});
  };

  return { isChecked, handleCheckboxChange, appliedFilters, applyFilters, clearFilters, setIsChecked };
}
