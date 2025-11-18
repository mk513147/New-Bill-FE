import { Dialog, Card, Button, HStack, Text } from "@chakra-ui/react";

export interface FieldConfig {
	name: string;
	label: string;
	type: "text" | "number" | "password" | "select";
	options?: string[];
	required?: boolean;
	defaultValue?: string | number;
}

interface AdaptiveModalProps {
	isOpen: boolean;
	title?: string;
	fields: FieldConfig[];
	onClose: () => void;
	onSubmit: (data: Record<string, any>) => void;
}

export default function AdaptiveModal({
	isOpen,
	title = "Form",
	fields,
	onClose,
	onSubmit,
}: AdaptiveModalProps) {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const values: Record<string, any> = {};

		fields.forEach((f) => {
			const val = fd.get(f.name);

			if (f.type === "number") values[f.name] = Number(val);
			else values[f.name] = val;
		});

		onSubmit(values);
	}

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Backdrop
				style={{
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,0.4)",
					backdropFilter: "blur(3px)",
				}}
			/>

			<Dialog.Content
				position="fixed"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="white"
				shadow="xl"
				rounded="lg"
				width="500px"
				maxW="90%"
			>
				<Card.Root>
					{/* HEADER */}
					<Card.Header p={4} borderBottom="1px solid #eee">
						<Text fontSize="xl" fontWeight="semibold">
							{title}
						</Text>
					</Card.Header>

					<form onSubmit={handleSubmit}>
						<Card.Body
							p={4}
							maxH="400px"
							overflowY="auto"
							display="grid"
							gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
							gap={4}
						>
							{fields.map((field) => (
								<div
									key={field.name}
									style={{ display: "flex", flexDirection: "column" }}
								>
									<label htmlFor={field.name} style={{ fontWeight: 500 }}>
										{field.label}
									</label>

									{field.type === "select" ? (
										<select
											id={field.name}
											name={field.name}
											defaultValue={field.defaultValue as string}
											required={field.required}
											style={{
												padding: "8px",
												borderRadius: "6px",
												border: "1px solid #ccc",
											}}
										>
											{field.options?.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
									) : (
										<input
											id={field.name}
											name={field.name}
											type={field.type}
											required={field.required}
											defaultValue={field.defaultValue as string}
											style={{
												padding: "8px",
												borderRadius: "6px",
												border: "1px solid #ccc",
											}}
										/>
									)}
								</div>
							))}
						</Card.Body>

						<Card.Footer p={4} borderTop="1px solid #eee">
							<HStack justify="flex-end" w="full">
								<Button variant="ghost" onClick={onClose}>
									Cancel
								</Button>
								<Button colorPalette="blue" type="submit">
									Submit
								</Button>
							</HStack>
						</Card.Footer>
					</form>
				</Card.Root>
			</Dialog.Content>
		</Dialog.Root>
	);
}
