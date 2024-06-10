import Joi from 'joi';
import { useTranslations } from 'next-intl';

export const useI18nJoi = () => {
  const t = useTranslations('Validation');
  return Joi.defaults(schema => {
    /*return schema.messages({
          "string.email": t("email", { label: "{{#label}}" }),
        });*/
    return schema.options({
      messages: {
        'string.empty': t('required', { label: '{{#label}}' }),
        'string.base': t('required', { label: '{{#label}}' }),
        'string.email': t('email', { label: '{{#label}}' }),
        'number.base': t('number', { label: '{{#label}}' }),
        'any.only': t('choose', { label: '{{#label}}' }),

        'any.custom': t('custom', { label: '{{#label}}' }),

        'custom.image_type': 'Upload only png, jpg, gif format image files',
        'custom.size': 'Size of file too large',
      },
    });
  });
};
