import * as React from 'react';
import { useForm, useFieldArray, useWatch, Control } from 'react-hook-form';
import { useI18nJoi } from '../../../shared/utils';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

//кастомные хуки они не центральные а паралельные

//Reset - обычное очищение html формы не меняет состояние реакт хука, даже если поля хоть и очищаются
//hook reset() работает всегда,onClick={reset} не будет работать,
//но будет работать если к кнопке добавить type=reset или надо вешать на <form onReset={reset}

//getValues() не вызывает обновления
//watch если его вызвать даже в onclick, все потом будет постоянно обновляться
//watch он тоже экономный, только указанное поле будет слушать и рендерить

//разница useWatch он работает через контекст, и работает из потомков, при этом также как и watch работает только после подписи
//но с корня не обновляет
//useWatch его обычно через контект в потомках используют чтоб корень зря не обновлять
//в корне сысла нет
//основной смысл беречь КОРЕНЬ

//joi перетирует html валидацию

/*
куки можно вот так записывать
document.cookie = "surname=Nurjanov ";
document.cookie = "name=Nurbek; max-age=0; ";*/

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

export default function App() {
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    title: Joi.string(),
    //title2: Joi.string().equal(Joi.ref('title')),
    /*title2: Joi.when('title', {
      is: Joi.exist().valid(1, 2),
      then: Joi.date().required(),
      otherwise: Joi.valid(''),
    }),*/
    /*title: Joi.string()
      .pattern(/[A-Za-z]{3}/)
      .messages({ 'string.pattern.base': 'bad format' }),*/
    //title: Joi.array().items(Joi.number().valid(2)).required(),
    //title: Joi.array().items(Joi.number(), Joi.string()).required(),
    cart: Joi.any(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    mode: 'onBlur',
    //resolver: joiResolver(schema),
    defaultValues: {
      title: '',
      cart: [
        {
          name: '',
          quantity: 0,
          price: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control,
  });

  const onSubmit = (data: IPost) => alert(JSON.stringify(data));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<select multiple {...register(`title`)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>*/}
        <input
          {...register(`title`, {
            /*required,
            min: {
              value: 3,
              message: 'Digit must be greater than 3',
            },*/
            /*pattern: {
              //type is "pattern"
              value: /[A-Za-z]{3}/,
              message: 'Bad format',
            },*/
            /*validate: (value, formValues) =>
              (formValues.title === value && false) || 'Must be equal', //type validate*/
            /*validate: {
              typeEqualCondition: (value, formValues) =>
                (formValues.title === value && false) || 'Must be equal',
              checkAsync: async () =>
                (await new Promise(resolve => resolve(false))) ||
                'error from Promise',
            },*/
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
                    {...register(`cart.${index}.name`, {
                      required: 'Mandatory',
                    })}
                  />
                  <div>{errors.cart?.[index]?.name?.message}</div>
                </div>

                <div>
                  <input
                    type="number"
                    {...register(`cart.${index}.quantity`, {
                      valueAsNumber: true,
                      required: 'Mandatory',
                    })}
                  />
                  <div>{errors.cart?.[index]?.quantity?.message}</div>
                </div>

                <div>
                  <input
                    type="number"
                    {...register(`cart.${index}.price` as const, {
                      valueAsNumber: true,
                      required: 'Mandatory',
                    })}
                  />
                  <div>{errors.cart?.[index]?.price?.message}</div>
                </div>

                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}
        <br />
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

        <button type="submit">Submit</button>
      </form>

      <Total control={control} />
    </div>
  );
}
