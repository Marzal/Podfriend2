import { useRef, useState, useEffect } from "react";

import { IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonNav } from "@ionic/react";
import LoginIndex from "./LoginIndex";

import useStore from 'store/Store';

import './AccountModal.scss'
import AccountPage from "./AccountPage";

const AccountModal = ({ trigger, canDismiss = true }) => {

	const page = useRef(null);
	const modal = useRef(null);
	const [presentingElement, setPresentingElement] = useState(null);

	const loggedIn = useStore((state) => state.loggedIn);
	
	useEffect(() => {
		setPresentingElement(page.current);
	}, []);

	const dismiss = () => {
		modal.current?.dismiss();
	}

	const [creatingUser,setCreatingUser] = useState(false);

	useEffect(() => {
		setCreatingUser(loggedIn === false);
	},[loggedIn]);

	const onDismiss = () => {
		if (loggedIn) {
			setCreatingUser(false);
		}
	};

	// console.log(loggedIn + ':' + creatingUser);

	return (
		<IonModal ref={modal} trigger={trigger} presentingElement={presentingElement} canDismiss={canDismiss} onDidDismiss={onDismiss}>
			{ (loggedIn && !creatingUser) &&
				<IonHeader>
					<IonToolbar>
						<IonTitle>Account</IonTitle>
						<IonButtons slot="end">
							<IonButton onClick={() => dismiss()}>Close</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
			}
			{ (!loggedIn || creatingUser) &&
				<IonNav root={() => <LoginIndex dismiss={dismiss} /> }>
					
				</IonNav>
			}
			{ (loggedIn && !creatingUser) &&
				<AccountPage dismiss={dismiss} />
			}
		</IonModal>
	);
}
export default AccountModal;