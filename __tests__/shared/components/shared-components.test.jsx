import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Badge from '../../../src/shared/components/badge/badge';
import Button from '../../../src/shared/components/button/button';
import CustomLoader from '../../../src/shared/components/custom-loader/custom-loader';
import Error from '../../../src/shared/components/error/error';
import ExternalLink from '../../../src/shared/components/link/external-link';
import Loading from '../../../src/shared/components/loading/loading';
import Logo from '../../../src/shared/components/logo/logo';
import ProgressBar from '../../../src/shared/components/progress-bar/progress-bar';
import Select from '../../../src/shared/components/select/select';

describe('shared components', () => {
	it('renders badge content', () => {
		render(<Badge>New</Badge>);

		expect(screen.getByText('New')).toBeInTheDocument();
	});

	it('renders button children and forwards props', () => {
		const handleClick = vi.fn();
		render(
			<Button onClick={handleClick} type="button">
				Save
			</Button>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Save' }));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders button as a custom component when provided', () => {
		render(
			<Button component="a" href="/about">
				About
			</Button>,
		);

		expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
			'href',
			'/about',
		);
	});

	it('renders the custom loader structure', () => {
		const { container } = render(<CustomLoader />);

		expect(container.firstChild).toBeInTheDocument();
		expect(container.querySelectorAll('div')).toHaveLength(3);
	});

	it('prefers error.message over message and calls retry handler', () => {
		const handleRetry = vi.fn();
		render(
			<Error
				message="Fallback message"
				error={{ message: 'Boom' }}
				onRetry={handleRetry}
			/>,
		);

		fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));

		expect(screen.getByText('Boom')).toBeInTheDocument();
		expect(handleRetry).toHaveBeenCalledTimes(1);
	});

	it('uses translated fallback error text when no message is provided', () => {
		render(<Error />);

		expect(screen.getByText('Error')).toBeInTheDocument();
		expect(
			screen.getByText('An error occurred. Please try again later.'),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: 'Try Again' }),
		).not.toBeInTheDocument();
	});

	it('renders external link with safe target attributes', () => {
		render(<ExternalLink href="https://example.com">Docs</ExternalLink>);

		expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
			'target',
			'_blank',
		);
		expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
			'rel',
			'noopener noreferrer',
		);
	});

	it('renders loading fallback translation and hides message when blank string is passed', () => {
		const { rerender } = render(<Loading />);

		expect(screen.getByText('Loading...')).toBeInTheDocument();

		rerender(<Loading message="" />);

		expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
	});

	it('renders logo image', () => {
		render(<Logo logo="/logo.svg" />);

		expect(screen.getByRole('img', { name: 'Logo' })).toHaveAttribute(
			'src',
			'/logo.svg',
		);
	});

	it('clamps progress bar value and renders custom label', () => {
		render(<ProgressBar value={2} label="Uploading" />);

		const progressBar = screen.getByRole('progressbar', { name: 'Uploading' });
		expect(progressBar).toHaveAttribute('aria-valuenow', '1');
		expect(screen.getByText('Uploading')).toBeInTheDocument();
	});

	it('uses generated progress label when a custom label is not provided', () => {
		render(<ProgressBar value={0.25} />);

		expect(
			screen.getByRole('progressbar', { name: 'Progress: 25%' }),
		).toBeInTheDocument();
	});

	it('renders select options and passes selected value to onChange', () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Language"
				value="en"
				onChange={handleChange}
				options={[
					{ value: 'en', label: 'English' },
					{ value: 'es', label: 'Spanish' },
				]}
			/>,
		);

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'es' },
		});

		expect(screen.getByText('Language')).toBeInTheDocument();
		expect(handleChange).toHaveBeenCalledWith('es');
	});
});
