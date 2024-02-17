import styled from 'styled-components';
import { Icon } from '../../../../Icon';

const SpecialPanelContainer = ({ className, publishedAt, EditButton, onEdit }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
				{publishedAt}
			</div>
			<div className="buttons">
				<div onClick={onEdit}>
					<EditButton />
				</div>
				<Icon id="fa-trash-o" margin="0 10px 0 0" size="21px" />
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
