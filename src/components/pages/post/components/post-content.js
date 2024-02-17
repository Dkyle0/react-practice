import styled from 'styled-components';
import { H2 } from '../../../h2';
import { Icon } from '../../../Icon';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id="fa-pencil-square-o" margin="0 10px 0 0" size="21px" />
					<Icon id="fa-trash-o" margin="0 10px 0 0" size="21px" />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		width: 375px;
		height: 206px;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
		font-size: 18px;
	}

	& .published-at {
		display: flex;
		height: 44px;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .post-text {
		font-size: 18px;
	}
`;
