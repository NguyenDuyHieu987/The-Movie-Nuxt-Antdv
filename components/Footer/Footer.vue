<template>
  <a-layout-footer class="footer">
    <div class="footer-container">
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <img src="/images/film-reel.png" style="height: 50px" />
          <h1>Phimhay247</h1>
        </NuxtLink>
      </div>

      <p class="note">
        Mọi thông tin, hình ảnh, video trên website đều được sưu tầm trên
        Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin
        nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi
        được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
      </p>

      <div class="support">
        <p>Mọi thông tin liên quan vui lòng liên hệ qua:</p>
        <NuxtLink
          class="facebook"
          target="blank"
          to="https://www.facebook.com/nguyen.d.hieu.355"
        >
          <!-- <font-awesome-icon icon="fa-brands fa-facebook-f" /> -->
          <Icon class="fa-facebook-f" name="fa6-brands:facebook-f" />

          facebook
        </NuxtLink>
        <NuxtLink class="email" to="mailto:vaicut6941@gmail.com">
          <!-- <font-awesome-icon icon="fa-regular fa-envelope" /> -->
          <Icon class="fa-envelope" name="fa6-regular:envelope" />

          Email: vaicut6941@gmail.com
        </NuxtLink>
      </div>
    </div>
    <p class="copyright">© Copyright by 2022 Phimhay247 All Right Reserved</p>
  </a-layout-footer>
</template>

<style scoped lang="scss" src="./Footer.scss"></style>
