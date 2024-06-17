import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export default function App() {
	// const [open, setOpen] = React.useState(false);

	// const handleClickToOpen = () => {
	// 	setOpen(true);
	// };

	// const handleToClose = () => {
	// 	setOpen(false);
	// };

	return (
		<div stlye={{}}>
			<Dialog>
				<DialogTitle>{'Trivia Questions'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						I am Good, Hope the same for you!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleToClose} color='primary' autoFocus>
						Close
					</Button> */}
				</DialogActions>
			</Dialog>
		</div>
	);
}
