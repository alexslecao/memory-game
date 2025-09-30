import './styles.css';

export interface CardProps {
    id: string;
    flipped?: boolean;
    back: string;
    handleClick?: (id: string) => void;
}

export function Card({ id, flipped = false, back, handleClick }: CardProps) {
    const cardContentClassList = ['card__content']
    flipped && cardContentClassList.push('card__content--flipped');

    const handleClickFn = (id: string) => {
        if (handleClick) {
            handleClick(id);
        }
    };

    return (
        <div className="card" onClick={() => handleClickFn(id)}>
            <div className={cardContentClassList.join(' ')}>
                <div className="card__face card__face--front"></div>
                <div className="card__face card__face--back">{back}</div>
            </div>
        </div>
    )
}