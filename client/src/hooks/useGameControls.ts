/**
 * 游戏键盘控制 Hook
 * 处理键盘输入并转换为游戏输入
 */

import { useEffect } from 'react';
import { GameInput } from '@/lib/tetris/types';
import { KEY_BINDINGS } from '@/lib/tetris/constants';

export function useGameControls(onInput: (input: GameInput) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const gameInput = KEY_BINDINGS[key] as GameInput | undefined;

      if (gameInput) {
        event.preventDefault();
        onInput(gameInput);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onInput]);
}
