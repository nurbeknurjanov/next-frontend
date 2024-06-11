import { useForm } from 'react-hook-form';
import { IProps } from './FilesFilters';
import { IFileFilters } from 'api/filesApi';
import { useAppSelector } from 'store/hooks';
import { files } from 'store';
import { useEffect, useRef } from 'react';

export function useFilesFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IFileFilters | null>(null);
  const getFilesState = useAppSelector(files.getFiles.selector.state);

  const defaultValues = { name: null, description: null, ...filters };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<IFileFilters>({
    mode: 'onTouched',
    defaultValues,
  });

  const submitForm = (formData: IFileFilters) => {
    setFilters(formData);
  };

  useEffect(() => {
    if (getFilesState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getFilesState.isFetching]);

  return {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getFilesState,
    previousFilters,
  };
}
