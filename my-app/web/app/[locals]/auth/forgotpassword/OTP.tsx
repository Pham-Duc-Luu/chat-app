import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useTranslations } from 'next-intl';

export default function OTP() {
  const t = useTranslations('authentication.forgot_password');

  return (
    <div className=" flex justify-center items-center flex-col gap-4">
      <div className=" mb-4">{t('form.otp.description')}</div>

      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button>{t('form.otp.verified')}</Button>
    </div>
  );
}
