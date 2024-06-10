import React from 'react';
import { useUserModalUpdate } from './useUserModalUpdate';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SEX_ENUM } from 'api/usersApi';

export type IProps = {
  id: string;
  onClose: () => void;
  refreshList: () => void;
};

export const UserModalUpdate: React.FC<IProps> = ({
  onClose,
  refreshList,
  id,
}) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tm,
    tc,
    tp,
    aggStates,
    getUserState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  } = useUserModalUpdate({
    id: id!,
    onClose,
    refreshList,
  });

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    ...sexRegisterOptions
  } = register('sex');

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tp('update')}</DialogTitle>
      <DialogContent>
        {getUserState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
          <form
            ref={el => (formRef.current = el!)}
            /*ref={formRef}*/
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(submitForm)(e);
            }}
          >
            <TextField
              label={tm('name')}
              error={!!errors['name']}
              helperText={errors['name']?.message as string}
              {...register('name')}
            />

            <TextField
              label={tm('email')}
              error={!!errors['email']}
              helperText={errors['email']?.message as string}
              {...register('email')}
            />

            <TextField
              label={tm('password')}
              error={!!errors['password']}
              helperText={errors['password']?.message as string}
              {...register('password')}
            />

            <TextField
              label={tm('age')}
              type="number"
              error={!!errors['age']}
              helperText={errors['age']?.message as string}
              {...register('age')}
            />

            <FormControl sx={{ mb: 2 }} error={!!errors['sex']}>
              <FormLabel>{tm('sex')}</FormLabel>
              <RadioGroup
                value={watch('sex')}
                {...sexRegisterOptions}
                onChange={(e, value) => {
                  setValue('sex', Number(value));
                }}
              >
                <FormControlLabel
                  value={SEX_ENUM.MALE}
                  control={<Radio />}
                  label={tm('sexOptions.male')}
                />
                <FormControlLabel
                  value={SEX_ENUM.FEMALE}
                  control={<Radio />}
                  label={tm('sexOptions.female')}
                />
              </RadioGroup>
              {!!errors['sex'] && (
                <FormHelperText>{errors['sex'].message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label={tm('status')}
              error={!!errors['status']}
              helperText={errors['status']?.message as string}
              {...register('status')}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          /*disabled={!isDirty || !isValid}*/
          autoFocus
          loading={aggStates.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tc('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
