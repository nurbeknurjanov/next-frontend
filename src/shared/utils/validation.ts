import Joi from 'joi';
import { useTranslations } from 'next-intl';

export const useI18nJoi = () => {
  const tValidation = useTranslations('Validation');
  return Joi.defaults(schema => {
    /*return schema.messages({
          "string.email": tValidation("email", { label: "{{#label}}" }),
        });*/
    return schema.options({
      messages: {
        'string.empty': tValidation('required', { label: '{{#label}}' }),
        'string.base': tValidation('required', { label: '{{#label}}' }),
        'string.email': tValidation('email', { label: '{{#label}}' }),
        'string.min': tValidation('string.min', {
          label: '{{#label}}',
          limit: '{{#limit}}',
        }),

        'number.base': tValidation('number', { label: '{{#label}}' }),

        'any.only': tValidation('choose', { label: '{{#label}}' }),

        'any.custom': tValidation('custom', { label: '{{#label}}' }),

        'custom.image_type': 'Upload only png, jpg, gif format image files',
        'custom.size': 'Size of file too large',
      },
    });
  });
};
