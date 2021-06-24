class ChatScene extends Phaser.Scene {
    constructor() {
        super('CHAT_SCENE_KEY');
    }

    preload() {
        console.log("PRELOAD CHAT SCENE");
        this.load.image('TITLE_BG', 'assets/sprites/TITLE_BACKGROUND.png');

        this.load.image('CHAT_BUTTON', 'assets/sprites/buttons/CHAT_BUTTON.png');
        this.load.image('CHAT_BUTTON_HOVER', 'assets/sprites/buttons/CHAT_BUTTON_HOVER.png');
        this.load.image('CHAT_BUTTON_DOWN', 'assets/sprites/buttons/CHAT_BUTTON_DOWN.png');
    }

    create() {
        console.log("CREATE CHAT SCENE");
        let bg = this.add.sprite(0, 0, 'TITLE_BG');
        bg.setOrigin(0, 0);

        this.chatButton = this.add.image(50, 50, 'CHAT_BUTTON');
        this.chatButton.setInteractive({ useHandCursor: true });
        this.chatButton.on('pointerover', () => this.chatHover());

        this.chatButtonHover = this.add.image(50, 50, 'CHAT_BUTTON_HOVER');
        this.chatButtonHover.setInteractive({ useHandCursor: true });
        this.chatButtonHover.on('pointerdown', () => this.chatDown());
        this.chatButtonHover.on('pointerout', () => this.chatOut());
        this.chatButtonHover.setVisible(false);

        this.chatButtonDown = this.add.image(50, 50, 'CHAT_BUTTON_DOWN');
        this.chatButtonDown.setInteractive({ useHandCursor: true });
        this.chatButtonDown.on('pointerup', () => this.chatUp());
        this.chatButtonDown.setVisible(false);
    }

    update() {

    }

    chatHover() {
        //console.log('controls not hovered');
        this.chatButtonHover.setVisible(true);
    }
    chatOut() {
        //console.log('controls not hovered');
        this.chatButtonHover.setVisible(false);
    }

    chatDown() {
        //console.log('controls clicked');
        this.chatButtonDown.setVisible(true);
    }

    chatUp() {
        //console.log('controls up');
        this.chatButtonDown.setVisible(false);
        this.scene.stop('CHAT_SCENE_KEY');
        this.scene.run('TITLE_SCENE_KEY');
        document.getElementById('chat').style.display = 'none';
    }
}