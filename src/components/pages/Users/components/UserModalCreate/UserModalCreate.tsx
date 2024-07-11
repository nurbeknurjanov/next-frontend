import React from 'react';
import { useUserModalCreate } from './useUserModalCreate';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SEX_ENUM, STATUS_ENUM } from 'api/usersApi';

export type IProps = {
  onClose: () => void;
  afterCreate: () => void;
};

export const UserModalCreate: React.FC<IProps> = ({ onClose, afterCreate }) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tUsersPage,
    tUser,
    createUserState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  } = useUserModalCreate({
    onClose,
    afterCreate,
  });

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    ...sexRegisterOptions
  } = register('sex');

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tUsersPage('create')}</DialogTitle>
      <DialogContent>
        {createUserState.isFetching ? (
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
              label={tUser('name')}
              error={!!errors['name']}
              helperText={errors['name']?.message}
              {...register('name')}
            />

            <TextField
              label={tUser('email')}
              error={!!errors['email']}
              helperText={errors['email']?.message}
              {...register('email')}
            />

            <TextField
              label={tUser('password')}
              error={!!errors['password']}
              helperText={errors['password']?.message}
              {...register('password')}
            />

            <TextField
              label={tUser('age')}
              type="number"
              error={!!errors['age']}
              helperText={errors['age']?.message}
              {...register('age')}
            />

            <FormControl sx={{ mb: 3 }} error={!!errors['sex']}>
              <FormLabel>{tUser('sex')}</FormLabel>
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
                  label={tUser('sexOptions.male')}
                />
                <FormControlLabel
                  value={SEX_ENUM.FEMALE}
                  control={<Radio />}
                  label={tUser('sexOptions.female')}
                />
              </RadioGroup>
              {!!errors['sex'] && (
                <FormHelperText>{errors['sex'].message}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }} error={!!errors['status']}>
              <InputLabel>{tUser('status')}</InputLabel>
              <Select
                label={tUser('status')}
                {...register('status')}
                value={watch('status') ?? ''}
              >
                <MenuItem value={STATUS_ENUM.ENABLED}>
                  {tUser('statusOptions.enabled')}
                </MenuItem>
                <MenuItem value={STATUS_ENUM.DISABLED}>
                  {tUser('statusOptions.disabled')}
                </MenuItem>
              </Select>
              {!!errors['status'] && (
                <FormHelperText>{errors['status'].message}</FormHelperText>
              )}
            </FormControl>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          autoFocus
          loading={createUserState.isFetching}
          disabled={!isDirty || !isValid}
          sx={{ minWidth: 120 }}
        >
          {tCommon('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
