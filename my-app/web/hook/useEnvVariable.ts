import AppConfigEnv, { Tenv } from '@/config/app.config';
import { useEffect, useState } from 'react';

function useEnvVariable(variableName: Tenv): string | undefined {
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const envValue = AppConfigEnv[variableName];
    setValue(envValue);
  }, [variableName]);

  return value;
}

export default useEnvVariable;
