import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';

type IPost = {
  title: string;
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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    defaultValues: {
      title: 'default',
      cart: [{ name: 'test', quantity: 1, price: 10 }],
    },
    mode: 'onBlur',
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
          placeholder="name"
          {...register(`title`, {
            required,
          })}
        />
        <div>{errors.title?.message}</div>
        <br />
        <br />

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section style={{ display: 'flex' }} key={field.id}>
                <div>
                  <input
                    placeholder="name"
                    {...register(`cart.${index}.name` as const, {
                      required,
                    })}
                  />
                  <div>{errors?.cart?.[index]?.name?.message}</div>
                </div>
                <div>
                  <input
                    placeholder="quantity"
                    type="number"
                    {...register(`cart.${index}.quantity` as const, {
                      valueAsNumber: true,
                      required,
                    })}
                  />
                  <div>{errors?.cart?.[index]?.quantity?.message}</div>
                </div>

                <div>
                  <input
                    placeholder="value"
                    type="number"
                    {...register(`cart.${index}.price` as const, {
                      valueAsNumber: true,
                      required,
                    })}
                    className={errors?.cart?.[index]?.price ? 'error' : ''}
                  />
                  <div>{errors?.cart?.[index]?.price?.message}</div>
                </div>
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

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

        <input type="submit" />
      </form>

      <Total control={control} />
    </div>
  );
}
