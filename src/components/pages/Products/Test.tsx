import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { useI18nJoi } from '../../../shared/utils';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

//Reset -обычный html формы и реакт хука оба работают
type IPost = {
  title: string;
  person: {
    firstName: string;
    lastName: string;
  };
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<IPost> }) => {
  const values = useWatch({
    name: 'cart',
    control,
  });
  const total = values.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

const required = 'This field is required';
export default function App() {
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    title: Joi.number(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      title: '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control,
  });
  const onSubmit = (data: IPost) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(`title`, {
            required,
          })}
        />
        <div>{errors.title?.message}</div>
        <br />
        <br />
        <button
          type="button"
          onClick={() =>
            append({
              name: '',
              quantity: 0,
              price: 0,
            })
          }
        >
          APPEND
        </button>

        <input type="reset" />
        <input type="submit" />
      </form>
    </div>
  );
}
