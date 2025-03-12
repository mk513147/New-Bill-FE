import { Toaster, toaster } from "@/components/ui/toaster";
type ToastType = "success" | "error" | "warning" | "info";

const ToasterUtil = () => {
	const toastFunc = (msg: String, type: ToastType = "info") => {
		toaster.create({
			title: msg,
			type: type,
			duration: 3000,
		});
	};

	return toastFunc;
};

export { ToasterUtil, Toaster };
