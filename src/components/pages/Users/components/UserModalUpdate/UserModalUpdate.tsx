import React /*, { ChangeEvent }*/ from 'react';
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

//import { Checkbox, FormGroup } from '@mui/material';

import { InputLabel, Select, MenuItem } from '@mui/material';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SEX_ENUM, STATUS_ENUM } from 'api/usersApi';

export type IProps = {
  id: string;
  onClose: () => void;
  afterUpdate: () => void;
};

export const UserModalUpdate: React.FC<IProps> = ({
  onClose,
  afterUpdate,
  id,
}) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tUserPage,
    tUser,
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
    afterUpdate,
  });

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    ...sexRegisterOptions
  } = register('sex');

  /*const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue('sex', Number(event.target.value));
    } else {
      setValue('sex', null);
    }
  };*/

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tUserPage('update')}</DialogTitle>
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
              label={tUser('name')}
              error={!!errors['name']}
              helperText={errors['name']?.message as string}
              {...register('name')}
            />

            <TextField
              label={tUser('email')}
              error={!!errors['email']}
              helperText={errors['email']?.message as string}
              {...register('email')}
            />

            <TextField
              label={tUser('password')}
              error={!!errors['password']}
              helperText={errors['password']?.message as string}
              {...register('password')}
            />

            <TextField
              label={tUser('age')}
              type="number"
              error={!!errors['age']}
              helperText={errors['age']?.message as string}
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

            {/*<FormControl sx={{ mb: 2 }} error={!!errors['sex']}>
              <FormLabel>{tUser('sex')}</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch('sex') === SEX_ENUM.MALE}
                      value={SEX_ENUM.MALE}
                      onChange={handleChange}
                    />
                  }
                  label={tUser('sexOptions.male')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch('sex') === SEX_ENUM.FEMALE}
                      value={SEX_ENUM.FEMALE}
                      onChange={handleChange}
                    />
                  }
                  label={tUser('sexOptions.female')}
                />
                {!!errors['sex'] && (
                  <FormHelperText>{errors['sex'].message}</FormHelperText>
                )}
              </FormGroup>
            </FormControl>*/}

            <FormControl size="small" sx={{ mb: 2 }}>
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
          disabled={!isDirty || !isValid}
          autoFocus
          loading={aggStates.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tCommon('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
