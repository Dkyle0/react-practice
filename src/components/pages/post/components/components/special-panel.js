import styled from 'styled-components';
import { Icon } from '../../../../Icon';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../../actions';
import { useServerRequest } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';

const SpecialPanelContainer = ({ className, id, publishedAt, EditButton, onEdit }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		console.log(id);
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						id="fa-calendar-o"
						margin="0 7px 0 0"
						size="18px"
						cursor="auto"
					/>
				)}
				{publishedAt}
			</div>
			<div className="buttons">
				<div onClick={onEdit}>
					<EditButton />
				</div>

				{publishedAt && (
					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						size="21px"
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin}; // 20px 0;
	font-size: 18px;

	& .published-at {
		display: flex;
		height: 44px;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}
`;
