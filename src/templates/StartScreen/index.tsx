import './styles.css';

interface StartScreenProps {
    onLevelSelect: (rows: number, cols: number) => void;
}

export function StartScreen({ onLevelSelect }: StartScreenProps) {
    return (
        <div className="start-screen">
            <h1>Bem-vindo ao Jogo da Memória!</h1>
            <p>Selecione um nível para começar:</p>
            <div className="level-buttons">
                <button onClick={() => onLevelSelect(4, 4)}>Iniciante (4x4)</button>
                <button onClick={() => onLevelSelect(4, 5)}>Fácil (4x5)</button>
                <button onClick={() => onLevelSelect(5, 6)}>Médio (5x6)</button>
                <button onClick={() => onLevelSelect(6, 6)}>Difícil (6x6)</button>
            </div>
        </div>
    );
}