import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useI18n } from '@/src/context/LocaleContext';
import { Controller, useForm } from 'react-hook-form';
import { CTextInput } from '@/src/shared';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
type FormData = {
  eventCity: string;
  eventSegment: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventDescription: string;
};

const ManualOrderingPage = () => {
  const { t, locale } = useI18n();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      eventCity: '',
      eventSegment: '',
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventDescription: '',
    },
  });
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     router.replace('/(application)');
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     console.log('');
  //   }
  // };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        padding: 15,
      }}
    >
      <CTextInput
        control={control}
        name="eventCity"
        label="City"
        rules={{
          required: 'City is required',
        }}
      />
      <CTextInput
        control={control}
        name="eventSegment"
        label="Event Segment"
        rules={{
          required: 'Event Segment is required',
        }}
      />
      <CTextInput
        control={control}
        name="eventType"
        label="Event Type"
        rules={{
          required: 'Event Type is required',
        }}
      />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <Controller
          control={control}
          name="eventDate"
          rules={{ required: 'Event Date is required' }}
          render={({ field: { value } }) => (
            <>
              <TouchableOpacity
                onPress={() => {
                  console.log('dawd');
                  setDatePickerVisible(true);
                }}
              >
                <TextInput
                  theme={{ roundness: 10 }}
                  style={{ width: 200 }}
                  label="Event Date"
                  mode="outlined"
                  value={value}
                  editable={false}
                />
              </TouchableOpacity>
              {errors.eventDate && (
                <Text style={{ color: 'red' }}>{errors.eventDate.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="eventTime"
          rules={{ required: 'Event Time is required' }}
          render={({ field: { value } }) => (
            <>
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                <TextInput
                  theme={{ roundness: 10 }}
                  style={{ width: 160 }}
                  label="Event Time"
                  mode="outlined"
                  value={value}
                  editable={false}
                />
              </TouchableOpacity>
              {errors.eventTime && (
                <Text style={{ color: 'red' }}>{errors.eventTime.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <DatePickerModal
        locale={locale === 'kz' ? 'ru' : locale}
        mode="single"
        visible={datePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={new Date()}
        onConfirm={(params) => {
          if (params.date) {
            setValue('eventDate', params.date.toISOString());
          }
          setDatePickerVisible(false);
        }}
      />

      <TimePickerModal
        locale={locale}
        visible={timePickerVisible}
        onDismiss={() => setTimePickerVisible(false)}
        onConfirm={({ hours, minutes }) => {
          setValue(
            'eventTime',
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
          );
          setTimePickerVisible(false);
        }}
        hours={new Date().getHours()}
        minutes={new Date().getMinutes()}
      />
      <CTextInput
        control={control}
        name="eventDescription"
        label="Event Description"
        rules={{
          required: 'Event Description is required',
        }}
        multiline
      />
    </View>
  );
};

export default ManualOrderingPage;
