import type { NextPage } from 'next';
import Default from '@layout/Default/Default';
import { GetServerSideProps } from 'next';
import { getBattles } from '@api/battles';
import { Battle } from '@type/api';
import CreateArmyPage from '@template/ArmyPage/CreateArmyPage';
import { useState } from 'react';
import { Message } from '@type/index';
import useForm from '@hook/useForm';
import { createArmy } from '@api/armies';

interface Props {
  battles: Battle[];
}
const CreateArmies: NextPage<Props> = ({ battles }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    message: '',
    type: 'success',
  });
  const { getFieldProps, getFormProps, errors } = useForm({
    fields: {
      name: {
        isRequired: 'Please enter a title',
        isMaxLength: {
          message: 'Max length is 100 characters',
          length: 100,
        },
      },
      units: {
        isRequired: 'Please enter number of units',
        isNumber: 'Please enter a number',
        isGreaterThan: {
          message: 'Please enter a value greater than or equal to 80',
          value: 79,
        },
        isLessThan: {
          message: 'Please enter a value less than or equal to 100',
          value: 101,
        },
      },
      attackStrategy: {
        isRequired: 'Please select an attack strategy',
      },
      battleId: {
        isRequired: 'Please select a battle',
      },
    },
    onSubmit: async (context: {
      values: {
        name: string;
        units: string;
        attackStrategy: string;
        battleId: string;
      };
      isFormValid: boolean;
    }) => {
      if (context.isFormValid) {
        const { name, units, attackStrategy, battleId } = context?.values || {};

        setLoading(true);
        createArmy({
          name,
          units: parseInt(units),
          attackStrategy,
          battleId: parseInt(battleId),
        })
          .then(() => {
            setMessage({
              message: 'Successfully created an army',
              type: 'success',
            });
          })
          .catch(() => {
            setMessage({
              message: 'Something went wrong while creating your army',
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
      <CreateArmyPage
        battles={battles}
        loading={loading}
        message={message}
        getFieldProps={getFieldProps}
        getFormProps={getFormProps}
        errors={errors}
      />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const battles = await getBattles();
  return { props: { battles } };
};

export default CreateArmies;
