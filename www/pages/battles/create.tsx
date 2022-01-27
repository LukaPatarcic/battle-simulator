import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import CreateBattlePage from '@template/BattlePage/CreateBattlePage';
import { useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createBattle } from '@api/battles';

const CreateBattles: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: '',
    type: 'success',
  });
  const { getFieldProps, getFormProps, errors } = useForm({
    fields: {
      title: {
        isRequired: 'Please enter a title',
        isMaxLength: {
          message: 'Max length is 100 characters',
          length: 100,
        },
      },
    },
    onSubmit: async (context: {
      values: { title: string };
      isFormValid: boolean;
    }) => {
      if (context.isFormValid) {
        const { title } = context?.values || {};

        setLoading(true);
        createBattle({ title })
          .then(() => {
            setMessage({
              message: 'Successfully created a battle',
              type: 'success',
            });
          })
          .catch(() => {
            setMessage({
              message: 'Something went wrong while creating your battle',
              type: 'danger',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    showErrors: 'blur',
  });
  return (
    <Default>
      <CreateBattlePage
        loading={loading}
        message={message}
        getFieldProps={getFieldProps}
        getFormProps={getFormProps}
        errors={errors}
      />
    </Default>
  );
};

export default CreateBattles;
