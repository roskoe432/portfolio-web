import { useMutation } from '@tanstack/react-query';
import { emailService } from '@services';

export function useEmailMutation() {
	return useMutation({
		mutationFn: async (formData) => {
			const response = await emailService.sendEmail(formData);
			return response;
		},
	});
}
