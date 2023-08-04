<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="logo">
        <NuxtLink :to="{ path: '/' }">
          <nuxt-img
            :src="getImage('logo.png', 'logo', 'w-60')"
            loading="lazy"
            alt=""
            :height="50"
            :width="50"
          />
          Phimhay247
        </NuxtLink>
      </div>

      <p class="note">
        Mọi thông tin, hình ảnh, video trên website đều được sưu tầm trên
        Internet. Chúng tôi không sở hữu hay chịu trách nhiệm bất kỳ thông tin
        nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi
        được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
      </p>

      <div class="support">
        <p>Thông tin liên hệ:</p>
        <div class="support-social">
          <NuxtLink
            class="facebook click-active"
            target="blank"
            to="https://www.facebook.com/nguyen.d.hieu.355"
          >
            <svg
              class="fa-facebook-f"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 320 512"
            >
              <path
                d="m279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              />
            </svg>

            facebook
          </NuxtLink>
          <NuxtLink class="email click-active" to="mailto:vaicut6941@gmail.com">
            <svg
              class="fa-envelope"
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"
              />
            </svg>

            Email: vaicut6941@gmail.com
          </NuxtLink>
        </div>
      </div>
    </div>
    <p class="copyright">© Copyright by 2022 Phimhay247 All Right Reserved</p>
  </footer>
</template>

<script setup lang="ts">
import { getImage } from '~/services/image';
</script>

<style lang="scss" scoped src="./Footer.scss"></style>
