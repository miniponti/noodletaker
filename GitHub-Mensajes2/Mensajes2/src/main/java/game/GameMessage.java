package game;

public class GameMessage {
	private float position;
	private float speed;
	private boolean attacking;
	private boolean player;
	
	public GameMessage() {
		
	}
	
	public GameMessage(float position, float speed, boolean attacking, boolean player) {
		this.position = position;
		this.speed = speed;
		this.attacking = attacking;
		this.player = player;
	}

	public float getPosition() {
		return position;
	}

	public void setPosition(float position) {
		this.position = position;
	}

	public float getSpeed() {
		return speed;
	}

	public void setSpeed(float speed) {
		this.speed = speed;
	}

	public boolean isAttacking() {
		return attacking;
	}

	public void setAttacking(boolean attacking) {
		this.attacking = attacking;
	}

	public boolean isPlayer() {
		return player;
	}

	public void setPlayer(boolean player) {
		this.player = player;
	}

}
